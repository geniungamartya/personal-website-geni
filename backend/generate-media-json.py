import json
import os

import typer

app = typer.Typer()


@app.command()
def scan_directory(input_dir: str, output_file: str):
    media_list = []

    # Iterate through subdirectories
    for subdir in sorted(os.listdir(input_dir)):
        subdir_path = os.path.join(input_dir, subdir)
        if os.path.isdir(subdir_path):
            media_data = []

            # Get all JPG files in the subdirectory
            for filename in sorted(os.listdir(subdir_path)):
                file_path = "/" + (
                    "/".join(os.path.join(subdir_path, filename).split("/")[1:])
                )
                # file_path = os.path.join(input_dir, subdir, filename)
                media_data.append(
                    {
                        "src": file_path,  # Original file path
                        "thumb": file_path,  # Using the same path for thumb (can modify if needed)
                    }
                )

            if media_data:
                media_list.append({"data": media_data})

    # Write to JSON
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(media_list, f, indent=4)

    typer.echo(f"✅ Successfully saved {len(media_list)} posts to {output_file}")


if __name__ == "__main__":
    app()
