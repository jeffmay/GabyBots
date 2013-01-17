from gbots.scraping import scrapy_settings
from gbots.util import loggers
from scrapy.commands import crawl

logger = loggers.getLogger(__name__)

class Command(crawl.Command):
    """
    @requires: minimal.json or starter.json fixture.
    """

    def syntax(self):
        return "[options] <spider>"

    def short_desc(self):
        return "Save all item urls and pages that are crawled from this spider and its start url."

    def add_options(self, parser):
        parser.add_option("-w", "--webroot",
            help="A directory where all web page domains and links will be set relative too.")
        super(Command, self).add_options(parser)

    def run(self, args, opts):
        # Run with default options
        import ipdb; ipdb.set_trace()
        self.crawler.settings.overrides["ITEM_PIPELINES"] = (
            'gbots.scraping.pipelines.FileArchivePipeline',
        )
        if opts.webroot is not None:
            self.crawler.settings.overrides["SAMPLE_WEBROOT"] = opts.webroot
        super(Command, self).run(args, opts)