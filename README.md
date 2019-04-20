# LabTrans

* [Backend](/server/README.md)
* [Front-end](/webapp/README.md)


After installing all dependencies and running the project, you will need to create an user to authenticate into the application.


You can do it by running:

```bash
curl 'http://localhost:8888/api/users/' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Origin: http://localhost:3000' \
    -H 'Content-Type: application/json;charset=UTF-8' \
    --data-binary '{"username":"labtrans","password":"123"}' --compressed
```

This will create the user `labtrans` with `123123` as his password