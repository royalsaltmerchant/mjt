// Slide-out sidebar with smooth animations
function SideBar(props) {
  this.props = props;
  this.elem = document.getElementById(this.props.id);
  this.isVisible = false;

  this.render = function() {
    // Create sidebar structure using DOM methods
    var sidebar = document.createElement('div');
    sidebar.className = 'sidebar';
    sidebar.id = 'sidebar';

    var sidebarItems = document.createElement('div');
    sidebarItems.className = 'sidebar-items';
    sidebarItems.id = 'sidebar-items';

    // About link
    var aboutLink = document.createElement('a');
    aboutLink.href = '/about';
    var aboutItem = document.createElement('div');
    aboutItem.className = 'sidebar-items-item';
    aboutItem.textContent = 'About';
    aboutLink.appendChild(aboutItem);

    // Divider
    var hr = document.createElement('hr');

    // Sessions link
    var sessionsLink = document.createElement('a');
    sessionsLink.href = '/sessions';
    var sessionsItem = document.createElement('div');
    sessionsItem.className = 'sidebar-items-item';
    sessionsItem.textContent = 'Sessions';
    sessionsLink.appendChild(sessionsItem);

    // Assemble
    sidebarItems.appendChild(aboutLink);
    sidebarItems.appendChild(hr);
    sidebarItems.appendChild(sessionsLink);
    sidebar.appendChild(sidebarItems);

    // Clear and append
    while (this.elem.firstChild) {
      this.elem.removeChild(this.elem.firstChild);
    }
    this.elem.appendChild(sidebar);

    var self = this;
    this.items = document.getElementById('sidebar-items');

    var hamburger = document.getElementById('hamburger');
    hamburger.addEventListener('click', function(event) {
      event.stopPropagation();
      if(self.isVisible) {
        self.hide();
      } else {
        self.show();
      }
    });

    // Close on click outside
    document.addEventListener('click', function(e) {
      if (self.isVisible && !self.items.contains(e.target) && e.target !== hamburger) {
        self.hide();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && self.isVisible) {
        self.hide();
      }
    });
  };

  this.hide = function() {
    this.isVisible = false;
    this.items.style.transform = 'translateX(220px)';
  };

  this.show = function() {
    this.isVisible = true;
    this.items.style.transform = 'translateX(0)';
  };

  this.render();
  return this;
}

var sidebar = new SideBar({id: 'mobile-menu'});
