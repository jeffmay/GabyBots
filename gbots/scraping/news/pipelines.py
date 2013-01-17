__author__ = 'jeffmay'

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/topics/item-pipeline.html

import logging

from django.db.utils import IntegrityError
from scrapy.exceptions import DropItem
from dynamic_scraper.models import SchedulerRuntime
from gbots.scraping.scrapy_settings import SAMPLE_WEB_ROOT
from gbots.util.web import save_web_page_complete


class BaseScrapedItemPipeLine(object):
    def process_item(self, item, spider):
        # This name must match BaseItemModel.source
        item['source'] = spider.ref_object
        try:
            # adds mandatory runtime checker
            checker_rt = SchedulerRuntime(runtime_type='C')
            checker_rt.save()
            item['checker_runtime'] = checker_rt
        except IntegrityError, e:
            spider.log(str(e), logging.ERROR)
            raise DropItem("Missing attribute.")
        return item


class DjangoWriterPipeline(BaseScrapedItemPipeLine):
    def process_item(self, item, spider):
        item = super(DjangoWriterPipeline, self).process_item(item, spider)
        try:
            item.save()
            spider.action_successful = True
            spider.log("Item saved.", logging.INFO)
        except IntegrityError, e:
            spider.log(str(e), logging.ERROR)
            raise DropItem("Missing attribute.")
        return item


class FileArchivePipeline(BaseScrapedItemPipeLine):
    def process_item(self, item, spider):
        item = super(WebArchiverPipeline, self).process_item(item, spider)
        try:
            save_web_page_complete(item["url"], SAMPLE_WEB_ROOT)
            spider.action_successful = True
            spider.log("Item saved.", logging.INFO)
        # TODO: Make this specific to the types of expected errors
        except Exception, e:
            spider.log(str(e), logging.ERROR)
            raise DropItem("Could not save static resources")
        return item
