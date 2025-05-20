import json
import os
import sys

def parse_json_to_files_and_directories(file_path):
    """
    Parses a JSON file containing file information and outputs
    the files and their contents, and creates directories as needed.

    Args:
        file_path (str): The path to the JSON file.
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            json_data = f.read()
        data = json.loads(json_data)
    except FileNotFoundError:
        print(f"Error: The file '{file_path}' was not found.")
        return
    except json.JSONDecodeError:
        print(f"Error: Could not decode JSON from '{file_path}'. Please ensure it's a valid JSON file.")
        return
    except Exception as e:
        print(f"An unexpected error occurred while reading the file: {e}")
        return

    if "files" in data:
        for file_info in data["files"]:
            file_name = file_info.get("name")
            contents = file_info.get("contents")
            is_binary = file_info.get("binary", False)

            if file_name:
                # Extract directory from file_name
                directory = os.path.dirname(file_name)

                # Create directory if it doesn't exist
                if directory and not os.path.exists(directory):
                    os.makedirs(directory)
                    print(f"Created directory: {directory}")

                # Write file contents
                mode = "wb" if is_binary else "w"
                try:
                    with open(file_name, mode, encoding='utf-8') as f:
                        if contents is not None:
                            if is_binary:
                                # For binary, contents would ideally be base64 encoded.
                                # For this example, we'll just encode to bytes if it's a string,
                                # assuming the contents are directly byte-representable or
                                # you'd handle base64 decoding here if that's the format.
                                f.write(contents.encode('utf-8') if isinstance(contents, str) else contents)
                            else:
                                f.write(contents)
                    print(f"Created file: {file_name}")
                except Exception as e:
                    print(f"Error writing file {file_name}: {e}")
            else:
                print("Skipping file entry due to missing 'name'.")
    else:
        print("No 'files' key found in the JSON data.")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python your_script_name.py <path_to_json_file>")
    else:
        json_file_path = sys.argv[1]
        parse_json_to_files_and_directories(json_file_path)