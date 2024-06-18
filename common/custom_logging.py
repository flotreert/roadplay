"""This module contains a function that creates a custom logger for fastapi application."""
import logging
import sys

def custom_logging(name)-> logging.Logger:
    """Creates a custom logger for fastapi application."""
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)
    log_format = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    stream_handler = logging.StreamHandler(sys.stdout)
    stream_handler.setFormatter(log_format)
    logger.addHandler(stream_handler)

    logger.debug('Logging is set up')
    return logger
