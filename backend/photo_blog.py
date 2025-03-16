import json
import logging
import os
import sys
from pathlib import Path

import typer
from dotenv import load_dotenv
from rich.progress import Progress
from storage import MinioClient

# Configure logging
logging.basicConfig(stream=sys.stdout, level=logging.INFO)

# Load environment variables
load_dotenv()

app = typer.Typer()

# Initialize MinIO client
minio_client = MinioClient()
bucket_name = os.getenv("MINIO_BUCKET")


def setup_bucket():
    """Ensure the MinIO bucket exists and is public."""
    if not minio_client.client.bucket_exists(bucket_name):
        minio_client.create_bucket(bucket_name)
        logging.info(f"Bucket '{bucket_name}' created.")
        minio_client.make_bucket_public(bucket_name)
    else:
        logging.info(f"Bucket '{bucket_name}' already exists.")


@app.command()
def upload(input_dir: str):
    """
    Upload all files from a directory to MinIO, preserving folder structure.
    """
    input_path = Path(input_dir).resolve()

    if not input_path.exists() or not input_path.is_dir():
        typer.echo(f"Error: '{input_dir}' is not a valid directory.", err=True)
        raise typer.Exit(code=1)

    with Progress() as progress:
        files = sorted(input_path.rglob("*"))  # Get all files in sorted order
        task = progress.add_task("[green]Uploading files...", total=len(files))

        for file in files:
            if file.is_file():
                object_name = file.relative_to(
                    input_path
                ).as_posix()  # Preserve structure
                file_url = minio_client.upload_object(
                    bucket_name, object_name, str(file)
                )
                logging.info(f"Uploaded: {file} -> {file_url}")
                progress.update(task, advance=1)

    typer.echo("✅ Upload complete.")


@app.command()
def generate_json(output_file: str):
    """
    Generate a JSON file containing MinIO file URLs in the desired structure.
    """
    objects = minio_client.list_objects(bucket_name)
    media_list = {}

    for obj in sorted(objects):
        subdir = Path(obj).parent.as_posix()  # Extract subdirectory
        file_url = minio_client.get_object_url(bucket_name, obj)

        media_list.setdefault(subdir, []).append({"src": file_url, "thumb": file_url})

    # Convert to desired JSON format
    formatted_output = [{"data": media_list[subdir]} for subdir in sorted(media_list)]

    # Save JSON
    output_path = Path(output_file).resolve()
    with output_path.open("w") as f:
        json.dump(formatted_output, f, indent=2)

    typer.echo(f"✅ JSON file saved to {output_path}")


if __name__ == "__main__":
    setup_bucket()
    app()
