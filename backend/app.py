from flask import Flask

app = Flask(__name__)


@app.route("/testings")
def testings():
    return{"testings":["1","2","3"]}


if __name__ =="__main__":
    app.run(debug=True)