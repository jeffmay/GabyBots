from gbots.scraping.news.spiders import ArticleSpider
from gbots.util.tests import TestCase

class TestFileArchivePipeline(TestCase):

    def setUp(self):
        self.spider = ArticleSpider()
        configure("ITEM_PIPELINES", (
            "gbots.scraping.pipelines.FileArchivePipeline",
        ))

    def test_article_spider(self):
        pass