def upload_data(data):
    with open(data,'rb') as fp:
        data = fp.read()
    return data