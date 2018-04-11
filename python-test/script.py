APP_VERSION = None
print(APP_VERSION)

with open('VERSION') as f:
    APP_VERSION = f.read()

print(APP_VERSION)
print(type(APP_VERSION))
