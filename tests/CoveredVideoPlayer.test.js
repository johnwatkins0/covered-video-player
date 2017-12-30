describe('Main Component', () => {
  let page;

  beforeAll(async () => {
    page = await global.__BROWSER__.newPage();
    await page.goto('http://localhost:1234/', { waitUntil: 'networkidle0' });
    await page.waitForSelector('video');
  });

  it(
    'Loads.',
    async done => {
      const videos = await page.$$('video');
      expect(videos.length).toEqual(1);

      done();
    },
    20000,
  );

  it(
    'Plays on click.',
    async done => {
      await page.click('button');

      const paused = await page.evaluate(() => {
        const video = document.querySelector('video');
        return video.paused;
      });

      expect(paused).toEqual(false);

      done();
    },
    20000,
  );
});
