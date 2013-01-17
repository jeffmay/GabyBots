from gbots.scraping.models import Article, BaseItemModel
from scrapy.contrib.djangoitem import DjangoItem

class BaseItem(DjangoItem):
    django_model = BaseItemModel

class ArticleItem(DjangoItem):
    django_model = Article
