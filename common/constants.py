import enum 

class TokenType(enum.StrEnum):
    USER_CREATION = 'user_creation'
    PASSWORD_RESET = 'password_reset'
    AUTHENTICATION = 'authentication'