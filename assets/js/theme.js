 // alertbar later
    $(document).scroll(function () {
        var y = $(this).scrollTop();
        if (y > 280) {
            $('.alertbar').fadeIn();
        } else {
            $('.alertbar').fadeOut();
        }
    });


// Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('#MagicMenu').outerHeight();

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();
        
        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down            
            $('#MagicMenu').removeClass('nav-down').addClass('nav-up'); 
            $('.nav-up').css('top', - $('#MagicMenu').outerHeight() + 'px');
           
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {               
                $('#MagicMenu').removeClass('nav-up').addClass('nav-down');
                $('.nav-up, .nav-down').css('top', '0px');             
            }
        }

        lastScrollTop = st;
    }
    
    
    $('.site-content').css('margin-top', $('header').outerHeight() + 'px');


function loadSearch(){
    // Create a new Index
    idx = lunr(function(){
        this.field('id')
        this.field('title', { boost: 10 })
        this.field('summary')
    })
 
    // Send a request to get the content json file
    $.getJSON('/content.json', function(data){
 
        // Put the data into the window global so it can be used later
        window.searchData = data
 
        // Loop through each entry and add it to the index
        $.each(data, function(index, entry){
            idx.add($.extend({"id": index}, entry))
        })
    })
 
    // When search is pressed on the menu toggle the search box
    $('#search').on('click', function(){
        $('.searchForm').toggleClass('show')
    })
 
    // When the search form is submitted
    $('#searchForm').on('submit', function(e){
        // Stop the default action
        e.preventDefault()
 
        // Find the results from lunr
        results = idx.search($('#searchField').val())
 
        // Empty #content and put a list in for the results
        $('#content').html('<h1>Search Results (' + results.length + ')</h1>')
        $('#content').append('<ul id="searchResults"></ul>')
 
        // Loop through results
        $.each(results, function(index, result){
            // Get the entry from the window global
            entry = window.searchData[result.ref]
 
            // Append the entry to the list.
            $('#searchResults').append('<li><a href="' + entry.url + '">' + entry.title + '</li>')
        })
    })
}



// Smooth on external page
$(function() {
  setTimeout(function() {
    if (location.hash) {
      /* we need to scroll to the top of the window first, because the browser will always jump to the anchor first before JavaScript is ready, thanks Stack Overflow: http://stackoverflow.com/a/3659116 */
      window.scrollTo(0, 0);
      target = location.hash.split('#');
      smoothScrollTo($('#'+target[1]));
    }
  }, 1);

  // taken from: https://css-tricks.com/snippets/jquery/smooth-scrolling/
  $('a[href*=\\#]:not([href=\\#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      smoothScrollTo($(this.hash));
      return false;
    }
  });

  function smoothScrollTo(target) {
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top
      }, 1000);
    }
  }
});

// Back to Top Button
$(function() {
    var backToTop = $('#back-to-top');

    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            backToTop.addClass('show');
        } else {
            backToTop.removeClass('show');
        }
    });

    backToTop.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });
});

// Code blocks: line numbers + copy button + language header
$(function() {
    $('.highlighter-rouge').each(function() {
        var block = $(this);
        var codeEl = block.find('pre.highlight code');
        if (!codeEl.length) return;

        // Detect language from class
        var lang = '';
        var classes = block.attr('class') || '';
        var match = classes.match(/language-(\S+)/);
        if (match) lang = match[1];

        // Count lines from text content
        var textContent = codeEl.text();
        var lines = textContent.split('\n');
        if (lines.length > 0 && lines[lines.length - 1].trim() === '') {
            lines.pop();
        }

        // Build line numbers string (plain text, newline-separated)
        var nums = [];
        for (var i = 1; i <= lines.length; i++) {
            nums.push(i);
        }
        var lineNumsEl = $('<pre class="code-line-nums" aria-hidden="true"></pre>').text(nums.join('\n'));

        // Build new structure:
        // .code-block-wrapper
        //   .code-header  (lang + copy btn)
        //   .code-body    (flex: line-nums + original pre)
        var wrapper = $('<div class="code-block-wrapper"></div>');
        var header = $('<div class="code-header"></div>');
        var langLabel = $('<span class="code-lang"></span>').text(lang || 'code');
        var copyBtn = $('<button class="code-copy-btn"><i class="fas fa-copy"></i> 複製</button>');
        header.append(langLabel).append(copyBtn);

        var body = $('<div class="code-body"></div>');
        var pre = block.find('pre.highlight');

        block.before(wrapper);
        body.append(lineNumsEl);
        body.append(pre);
        wrapper.append(header).append(body);

        // Remove the now-empty highlighter-rouge div
        block.remove();

        // Copy functionality
        copyBtn.on('click', function() {
            var text = codeEl.text();
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(function() {
                    copyBtn.addClass('copied').html('<i class="fas fa-check"></i> 已複製');
                    setTimeout(function() {
                        copyBtn.removeClass('copied').html('<i class="fas fa-copy"></i> 複製');
                    }, 2000);
                });
            }
        });
    });
});