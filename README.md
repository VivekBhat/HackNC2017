# Hack NC 2017
## Bitcoin Sentiment Analysis by calculating the Bitcoin Sentiment Index
## Team Members:
<b>1.</b> Vivek Bhat <br>
<b>2.</b> Priyal Jain <br>
<b>3.</b> Sonal Patil  <br>
<b>4.</b> Jaydeep Rane <br>
<b>5.</b> Sohan Kunkerkar <br>

### Natural Language Processing

Multiple papers have been publised regarding "Bitcoin price prediction using Twitter Sentiment Analysis", such as the ones mentioned below:

- http://www.diva-portal.org/smash/get/diva2:1110776/FULLTEXT01.pdf
- http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0161197

This indicates the significant impact of social media platforms and the sentiments of its users on the price of Bitcoins.
Taking this observation into account, our project comes as a guiding hand to aspiring Bitcoin investors who use Amazon Alexa.

We make use of Live Twitter Data and capture the overall positive/negative/neutral Bitcoin Sentiment on Twitter by calculating the Bitcoin Sentiment Index (BSI).

**BSI = (count of positively classified tweets) / (count of negatively classified tweets)**

There were multiple tweet sentiment analysis packages experimented with such as:

- Stanford CoreNLP
- TextBlob
- **vaderSentiment**

vaderSentiment is extensively used in Bitcoin Sentiment Analysis and has higher accuracy as compared to the other two packages mentioned. Therefore, we used this package while classifying the bitcoin relevant tweets as positive/negative/neutral.

In order to give the Alexa user a global perspective on the Bitcoin, we also scraped https://news.hodlhodl.com/ to present the user with the most recent global happenings on this cryptocurrency. 
### Software Engineering <br>
We used following technologies to build Alexa skills:<br>
<b>1.</b> Amazon Developer SDK (for building Amazon Skill Set)<br>
<b>2.</b> Amazon Lambda (for Serverless infrastracture)<br>
<b>3.</b> Amazon S3 (for storing services)<br>
<b>4.</b> Bittrex API <br>
<b>5.</b> Twitter API and Tweepy<br>
<b>6.</b> Amazon EC2 <br>
The core components of our project include Amazon Alexa SDK and Lambda where we deployed our services and developed alexa skills. We build our business logic for alexa using Nodejs and consumed ec2 and S3 storage services to implement our project.
<br>
<b>Here's the infrastructure Architecutre that we followed while developing our project:</b><br>
![alt tag](https://github.com/VivekBhat/HackNC2017/blob/master/resources/Infrastructure%20(1).jpg)</br>

In conclusion, our project helps the user make a more informed decision before deciding against or in favour of investing in Bitcoin.





