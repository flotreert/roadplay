"""This module contains the functions to download and upload image files to the storage path """
import base64
import logging
import io
import os
import uuid

logging.basicConfig(
    level=logging.DEBUG,
    filename='app.log',
    filemode='a',
    format='%(asctime)s - %(levelname)s - %(message)s',
)
logger = logging.getLogger(__name__)
FOLDER = 'data/'


def get_storage_path(folder: str | None = None):
    """Creates a storage path for the image file """
    if folder:
        filepath = f'{folder}/{uuid.uuid4()}.jpg'
    else:
        filepath = f'{uuid.uuid4()}.jpg'
    return os.path.join(FOLDER, filepath)


def download(url: bytes, folder: str | None = None):
    """Downloads the image file and store it in the storage path """
    filepath = get_storage_path(folder)
    logger.error('Dowloading data to file path: %s', filepath)
    bytes_data = url.decode('utf-8')
    data_split = bytes_data.split('base64,')
    logger.error('Data split: %s', data_split)
    encoded_data = data_split[1]
    data = base64.b64decode(encoded_data)
    with open(filepath, 'wb') as f:
        f.write(data)
    return filepath


def upload(filepath: str):
    """Uploads the image file to the storage path """
    logger.info('Uploading file path: %s', filepath)
    with open(filepath, 'rb') as f:
        data = f.read()
    data = base64.b64encode(data)
    return data
