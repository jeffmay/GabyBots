from gbots.util.tests import TestCase
from gbots.scraping.commands import savesample

class TestStoreSample(TestCase):

    def setUp(self):
        self.runner = savesample.Command()

    def test_run(self):
        self.runner.run()
