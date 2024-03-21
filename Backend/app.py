import pandas as pd 
from flask import Flask,jsonify,request,render_template,Response
from transformers import pipeline
import pandas as pd
app = Flask(__name__)
from flask_cors import CORS
CORS(app)

df=pd.read_csv("data1.csv",encoding='unicode_escape')
data1=pd.read_csv("data3.csv")
data1=data1.astype(str)
tqa = pipeline(task="table-question-answering",model="google/tapas-base-finetuned-wtq")






@app.route('/product',methods=['GET','POST'])
def products():
    
    
    return (jsonify( df.to_dict('records')))

@app.route("/product/<int:id>",methods=['GET','POST'])
def product(id):
    d=df.loc[df['id'] == id]
    print(d)
    return (jsonify( d.to_dict('records')))

@app.route('/process_text', methods=['POST'])
def process_text():
    data = request.get_json()
    text = data.get('text', '')
    print(text)
    # Process the text (you can replace this with your logic)
    response =str(tqa(table=data1,query=text)["answer"])
    if (response.find('>')!=-1):
        response=response.split('>')
        return jsonify({'response': response[1]})
    return jsonify({'response': response})

if __name__=="__main__":

    app.run( debug=True)