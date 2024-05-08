import uuid

import fastapi
import jwt
 

def get_user_id_from_token(
    token: str,
    type_: type[int] | type[uuid.UUID],
) -> int | uuid.UUID:
    """Extracts the user ID from a jwt.

    This function should be used as a dependency in a FastAPI route handler.
    If a valid JWT is present in the header, it returns the user ID of the
    authenticated user.

    Args:
        token (str): The jwt containing user session information.
        type_ (type[int] | type[uuid.UUID]): The type of the user ID.

    Raises:
        credentials_exception: Raised if the token is invalid (malformed,
            expired or no user_id provided).

    Returns:
        int | uuid.UUID : ID of the authenticated user.
    """
    credentials_exception = fastapi.HTTPException(
        status_code=fastapi.status.HTTP_401_UNAUTHORIZED,
        detail='Could not validate credentials',
        headers={'WWW-Authenticate': 'Bearer'},
    )
    
    try:
        payload = jwt.decode(
            token,
            auth_settings.auth_token_secret_key,
            algorithms=[auth_settings.encrypt_algo],
        )
        if type_ == uuid.UUID:
            user_id = payload.get('sub', None)
            if user_id is None:
                raise credentials_exception
            user_id = uuid.UUID(user_id)
        else:
            user: dict = payload.get('user', None)
            if user is not None:
                user_id = user.get('id', None)
            if user is None or user_id is None:
                raise credentials_exception
            else:
                user_id = int(user_id)
    except jwt.InvalidTokenError as e:
        raise credentials_exception from e
    return user_id


def get_user_id(
    credentials: security.HTTPAuthorizationCredentials = fastapi.
    Depends(bearer_scheme),
) -> int:
    """Extracts the user ID from a HTTP request.

    This function should be used as a dependency in a FastAPI route handler.
    If a valid JWT is present in the header, it returns the user ID of the
    authenticated user.

    Args:
        credentials (security.HTTPAuthorizationCredentials, optional):
            Authentication credentials.
            In most cases, it should not be provided and let to the default.
            Defaults to fastapi.Depends(bearer_scheme).

    Returns:
        int: ID of the authenticated user.
    """
    token = credentials.credentials
    return get_user_id_from_token(token=token, type_=int)


def get_user_uid(
    credentials: security.HTTPAuthorizationCredentials = fastapi.
    Depends(bearer_scheme),
) -> uuid.UUID:
    """Extracts the user UID from a HTTP request.

    This function should be used as a dependency in a FastAPI route handler.
    If a valid JWT is present in the header, it returns the user ID of the
    authenticated user.

    Args:
        credentials (security.HTTPAuthorizationCredentials, optional):
            Authentication credentials.
            In most cases, it should not be provided and let to the default.
            Defaults to fastapi.Depends(bearer_scheme).

    Returns:
        uuid.UUID: UID of the authenticated user.
    """
    token = credentials.credentials
    return get_user_id_from_token(token=token, type_=uuid.UUID)
