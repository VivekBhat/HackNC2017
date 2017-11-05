# import tweepy library for twitter api access and textblob libary for sentiment analysis
import csv
import tweepy
import numpy as np
import re
import nltk
import boto3
from time import sleep
import pandas as pd
import datetime
from tweepy.streaming import StreamListener
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from twitter_creds import consumer_key, consumer_secret, access_token, access_token_secret
from collections import Counter
from tweepy import OAuthHandler, Stream

global cpos
global cneg
global i

def main():

    auth = OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
 
    cpos = 4038
    cneg = 539
    i = 0
    # Open/create a file to append data to
    csvFile = open('result1.csv', 'a')

    #Use csv writer
    csvWriter = csv.writer(csvFile)
    
    api = tweepy.API(auth,wait_on_rate_limit=True)

    sincedate = datetime.datetime.today().strftime('%Y-%m-%d')
    untildate = datetime.datetime.today().strftime('%Y-%m-%d')

    if i % 2 == 0:
        sval = int(sincedate[-2:]) - 2
        uval = int(untildate[-2:]) - 1
        a = ""
        b = ""
        if len(str(sval)) == 1:
            a = "0" + str(sval)
        else:
            a = str(sval)

        if len(str(uval)) == 1:
            b = "0" + str(uval)
        else:
            b = str(uval)
    i += 1


    sincedate = sincedate[:-2] + a
    untildate = untildate[:-2] + b
    #print sincedate, untildate
    
    for tweet in tweepy.Cursor(api.search,
                           q = "bitcoin price",
                           since = sincedate,
                           until = untildate,
                           lang = "en").items():
        csvWriter.writerow([tweet.created_at, tweet.text.encode('utf-8')])
        #print tweet.created_at, tweet.text
    csvFile.close()
    
    df = pd.read_csv('result1.csv')

    tweets_list = list(df.iloc[:,1])
    #print len(tweets_list)

    un_labelled = []
    k = 0
    for tweet in tweets_list:
        k += 1
        tweet = re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet)
        words = [w.lower() for w in tweet.strip().split() if len(w)>=3]
        un_labelled.append(' '.join(words))
        if k > 100:
            break

    csvFileP = open('master_positive.csv', 'a')
    csvWriterPositive = csv.writer(csvFileP)

    csvFileN = open('master_negative.csv', 'a')
    csvWriterNegative = csv.writer(csvFileN)

    for sentence in un_labelled:
        analyzer = SentimentIntensityAnalyzer()
        vs = analyzer.polarity_scores(sentence)

    # print(str(vs))
        if vs["compound"] < (-0.5057):
            cneg += 1
            csvWriterNegative.writerow([sentence, "Negative"])

        if vs["compound"] > (0.5057):
            cpos += 1
            csvWriterPositive.writerow([sentence, "Positive"])

    csvFileP.close()
    csvFileN.close()
    
    from bs4 import BeautifulSoup
    import requests


    page = requests.get("https://news.hodlhodl.com/")
    soup = BeautifulSoup(page.content, 'html.parser')

    li_list = len(soup.findAll('li', {'class': ""}))

    countP =0
    countN = 0
    global_sentiment = []

    for div in soup.findAll('li', {'class': ""}):

        flag = div.img.get('alt','')

        # if flag=="Flair bullish":
        #   countP+=1
        # else:
        #   countN+=1

        a = div.findAll('a')[0]
        global_sentiment.append(a.text)



    bsi = cpos/cneg
    #print bsi, cpos, cneg
    string = ""
    
    if bsi > 1:
        string = "Hello ! The current social media trend reflects a positive sentiment with a bitcoin sentiment index of " + str(bsi) +"." + str(global_sentiment[0]) +"." + str(global_sentiment[1]) +"." + str(global_sentiment[2])
    elif bsi < 1:
        string = "Hello ! The current social media trend reflects a negative sentiment with a bitcoin sentiment index of " + str(bsi)+"." + str(global_sentiment[0]) +"." + str(global_sentiment[1]) +"." +str(global_sentiment[2])
    else:
        string = "Hello ! The current social media trend reflects a neutral sentiment with a bitcoin sentiment index of " + str(bsi)+"." + str(global_sentiment[0]) +"." + str(global_sentiment[1]) +"." +str(global_sentiment[2]) 

    result = {}
    result['current_bitcoin_sentiment'] = string
    
    import json
    with open('result.json', 'w') as fp:
        json.dump(result, fp)

if __name__ == '__main__':
    i = 0
    while True:
        main()
        sleep(43200)
        
