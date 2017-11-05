# Hack NC 2017

## Bitcoin Sentiment Analysis by calculating the Bitcoin Sentiment Index

### Natural Language Processing

Multiple papers have been publised regarding "Bitcoin proce prediction using Twitter Sentiment Analysis", such as the ones mentioned below:

- "http://www.diva-portal.org/smash/get/diva2:1110776/FULLTEXT01.pdf"
- "http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0161197"

This indicates the significant impact of social media platforms and the sentiments of its users on the price of Bitcoins.
Taking this observation into account, our project comes as a guiding hand to aspiring Bitcoin investors who use Amazon Alexa.

We make use of Live Twitter Data and capture the overall positive/negative/neutral Bitcoin Sentiment on Twitter by calculating the Bitcoin Sentiment Index (BSI).

**BSI = (count of positively classified tweets) / (count of negatively classified tweets)**

There were multiple tweet sentiment analysis packages experimented with such as:

- Stanford CoreNLP
- TextBlob
- **vaderSentiment**

vaderSentiment is extensively used in Bitcoin Sentiment Analysis and has higher accuracy as compared to the other two packages mentioned. Therefore, we used this package while classifying the bitcoin relevant tweets as positive/negative/neutral.

In order to give the Alexa user a global perspective on the Bitcoin, we also scraped "https://news.hodlhodl.com/" to present the user with the most recent global happenings on this cryptocurrency. 

In conclusion, our project helps the user make a more informed decision before deciding against or in favour of investing in Bitcoin.





