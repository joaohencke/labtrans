# LabTrans

* [Backend](/server/README.md)
* [Front-end](/webapp/README.md)


# Creating user

```bash
curl 'http://localhost:8888/api/users/' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Origin: http://localhost:3000' \
    -H 'Content-Type: application/json;charset=UTF-8' \
    --data-binary '{"username":"labtrans","password":"123"}' --compressed
```