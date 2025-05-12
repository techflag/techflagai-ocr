import uuid

def getuuid():
    s = str(uuid.uuid4())
    return s.replace("-","")