/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
		var i;
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TEST 1: A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
		it('have a URL property defined and the URL property is not empty', function() {			
			for(i = 0; i < allFeeds.length; i++) {
				expect(allFeeds[i].url).toBeDefined();
				expect(allFeeds[i].url).not.toBeNull();
			}
        });

        /* TEST 2: A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */		 
		it('have a name property defined and the name property is not empty', function() {			
			for(i = 0; i < allFeeds.length; i++) {
				expect(allFeeds[i].name).toBeDefined();
				expect(allFeeds[i].name).not.toBeNull();
			}
        });
    });

	describe('The menu', function() {
		
        /* TEST 3: A test that that ensures the menu element is
         * hidden by default.  It ensures that .menu-hidden is present in the BODY element
         */
		it('is hidden by default', function() {
			expect($("body").hasClass("menu-hidden")).toBe(true);
		});

         /* TEST 4: A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has 2 expectations - the menu is visible when it is initially clicked...and is hidden when clicked again.
          */
		it('displays when the menu icon is clicked and is hidden when clicked again', function() {
			$('.menu-icon-link').click();
			expect($("body").attr('class')).toEqual("");
			$('.menu-icon-link').click();
			expect($("body").attr('class')).toEqual("menu-hidden");
		});
	});
	
	describe('Initial Entries', function() {
        /* TEST 5: A test that ensures when the loadFeed asynchronous
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

		beforeEach(function(done) {
			loadFeed(function() {
				done();
			});
		});
		
		// this variable will be set to true once at least one entry is found...
		var initialComplete = false;

		function loadFeed(cb) {
			
			/* Call setTimout function, check size of all articles with class entry, within the .feed container.
			 * If at least one entry found, set initialComplete variable to true, thus causing test to pass.
			 */
			
			setTimeout(function() {
				var entriesCount = $('.feed .entry').size();
				
				if(entriesCount >= 1) {
					initialComplete = true;
				}
				if(cb) {
					return cb();
				}
			},300);
		}
		
		it('loads at least a single .entry element within the .feed container', function(done) {	
			expect(initialComplete).toBe(true);
			done();
		});
	});
	
	describe('New Feed Selection', function() {
        /* TEST 6: A test that ensures when a new feed is loaded
         * by the loadFeed function, the content actually changes.
         */

		var initialFeed;
		
		//beforeEach() loads the first feed and stores it's contents in the initialFeed variable...then invokes done()
		beforeEach(function(done) {
			loadFeed(0, function() {
			  initialFeed = $('.feed').html();
			  done();
			});
		});
		
		/* TEST 6: the expectation then starts off loading the next feed and compares its contents to that of initialFeed.
         *   If they are different, call done...test passes
         */
		it('when a new feed is loaded by the loadFeed function, the content actually changes', function(done) {
			loadFeed(1, function() {
			  expect($('.feed').html() !== initialFeed).toBe(true);
			  done();
			});
		});
	});
        
	
	
}());
