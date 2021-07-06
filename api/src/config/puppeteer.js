/**
 * This module stores the configuration for using Puppeteer to scrape Google Scholar.
 */

const puppeteerConfig = {
  noOfDummyLinks: 4, // first 4 links aren't publications can be ignored
  noOfThreads: 10, // number of concurrent threads
  pageSize: 10, // number of publications to return at once
  baseUrl: "https://scholar.google.com.sg/citations?hl=en&user=",
  startSuffix: "&cstart=", // concatenate number to start at after
  pageSizeSuffix: "&pagesize=", // concatenate page size after
  sortBySuffix: "&view_op=list_works&sortby=pubdate", // put most recent pubs first
};

const categoryType = {
  CONFERENCE: "CONFERENCE",
  JOURNAL: "JOURNAL",
  OTHER: "OTHER",
  BOOK: "BOOK",
};

const categoryTypEnum = ['CONFERENCE', 'JOURNAL', 'OTHER', 'BOOK'];

module.exports = { puppeteerConfig, categoryType, categoryTypeEnum }