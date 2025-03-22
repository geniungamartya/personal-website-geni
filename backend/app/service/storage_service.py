import json
import logging
import os

from minio import Minio
from minio.error import S3Error

from app.config.storage_config import StorageSettings


class StorageService:
    def __init__(self, config: StorageSettings = StorageSettings()):
        """Initialize MinIO client with environment variables."""
        self.client = Minio(
            config.URL,
            access_key=config.USER,
            secret_key=config.PASSWORD,
            secure=config.USE_HTTPS,
        )

    def create_bucket(self, bucket_name: str):
        """Create a new MinIO bucket."""
        try:
            if not self.client.bucket_exists(bucket_name):
                self.client.make_bucket(bucket_name)
                logging.info(f"Bucket '{bucket_name}' created successfully.")
            else:
                logging.info(f"Bucket '{bucket_name}' already exists.")
        except S3Error as e:
            logging.error(f"Error creating bucket: {e}")

    def upload_object(self, bucket_name: str, object_name: str, file_path: str):
        """Upload an object (file) to a MinIO bucket."""
        try:
            self.client.fput_object(bucket_name, object_name, file_path)
            logging.info(f"Uploaded '{object_name}' to bucket '{bucket_name}'.")
            return self.get_object_url(bucket_name, object_name)
        except S3Error as e:
            logging.error(f"Error uploading '{object_name}': {e}")

    def list_objects(self, bucket_name: str):
        """List all objects in a MinIO bucket."""
        try:
            objects = self.client.list_objects(bucket_name, recursive=True)
            return [obj.object_name for obj in objects]
        except S3Error as e:
            logging.error(f"Error listing objects in '{bucket_name}': {e}")
            return []

    def delete_object(self, bucket_name: str, object_name: str):
        """Delete an object from a MinIO bucket."""
        try:
            self.client.remove_object(bucket_name, object_name)
            logging.info(f"Deleted '{object_name}' from '{bucket_name}'.")
        except S3Error as e:
            logging.error(f"Error deleting '{object_name}': {e}")

    def delete_bucket(self, bucket_name: str):
        """Delete a MinIO bucket."""
        try:
            self.client.remove_bucket(bucket_name)
            logging.info(f"Deleted bucket '{bucket_name}'.")
        except S3Error as e:
            logging.error(f"Error deleting bucket: {e}")

    def make_bucket_public(self, bucket_name: str):
        """Set bucket policy to make it public."""
        try:
            policy = {
                "Version": "2012-10-17",
                "Statement": [
                    {
                        "Effect": "Allow",
                        "Principal": {"AWS": ["*"]},
                        "Action": ["s3:GetBucketLocation", "s3:ListBucket"],
                        "Resource": [f"arn:aws:s3:::{bucket_name}"],
                    },
                    {
                        "Effect": "Allow",
                        "Principal": {"AWS": ["*"]},
                        "Action": ["s3:GetObject"],
                        "Resource": [f"arn:aws:s3:::{bucket_name}/*"],
                    },
                ],
            }
            self.client.set_bucket_policy(bucket_name, json.dumps(policy))
            logging.info(f"Bucket '{bucket_name}' is now public.")
        except S3Error as e:
            logging.error(f"Error setting bucket policy: {e}")

    def get_object_url(
        self, bucket_name: str, object_name: str, secure: bool = False
    ) -> str:
        """Generate a public URL for an object."""
        protocol = "https://" if secure else "http://"
        return f"{protocol}{os.getenv('MINIO_URL')}/{bucket_name}/{object_name}"
