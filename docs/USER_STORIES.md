# User Stories

## Project Goal

A Tournament Bracket Generator which uses CSV upload and export.

**Caveats:**
- No Database Storage, local Storage for state saving
- No User Authentication
- Single Page Application

## Github Issue Format

```markdown
### Story
As a \<role\>, so that I can \<goal\>, I want to \<action\>

### Points
[number] points

### Acceptance Criteria
- List of items that are required for this issue in technical detail
```

| Roles | Definition |
|-------|------------|
| Visitor | Anyone with public acces to the application |
| Developer | Anyone maintaining the application codebase |

## Code Execution

Code will be developed in this order:
1. Create and commit a Cucumber Feature File (Gherkin) from the Story with Scenarios 
2. Build out the implementation and cucumber feature tests

# Stories

## Developer Setup Issues

### TB-001: Initialize Ruby on Rails Application

#### Story
As a Developer, so that I can build the tournament bracket application, I want to initialize a new Ruby on Rails application with the appropriate configuration.

#### Points
3 points

#### Acceptance Criteria
- Rails application created with Rails 7.x or later
- Application configured as a Single Page Application (SPA)
- No database adapter configured (no database storage per project requirements)
- Application structure follows Rails conventions
- Application can start successfully with `rails server`
- Basic routing configured for root path
- Application ready for frontend integration

---

### TB-002: Install and Configure TailwindCSS v4

#### Story
As a Developer, so that I can style the tournament bracket application with modern CSS, I want to install and configure TailwindCSS v4.

#### Points
5 points

#### Acceptance Criteria
- TailwindCSS v4 installed via Rails asset pipeline
- TailwindCSS directives included in main stylesheet (application.css)
- Build pipeline compiles TailwindCSS classes correctly
- TailwindCSS utilities available in all views/components

---

### TB-003: Setup Capybara for Integration Testing

#### Story
As a Developer, so that I can write integration tests for user interactions, I want to setup Capybara with appropriate drivers.

#### Points
3 points

#### Acceptance Criteria
- Capybara gem added to Gemfile (test group)
- Capybara configured in `spec/spec_helper.rb` or `test/test_helper.rb`
- Selenium WebDriver or Capybara-webkit configured as driver
- Capybara DSL available in test files
- Sample integration test written to verify Capybara setup
- Tests can interact with browser elements (click, fill_in, etc.)

---

### TB-004: Setup RSpec Testing Framework

#### Story
As a Developer, so that I can write unit and integration tests, I want to setup RSpec testing framework.

#### Points
3 points

#### Acceptance Criteria
- RSpec gem added to Gemfile (test/development group)
- RSpec initialized with `rails generate rspec:install`
- RSpec configuration files created (`spec/spec_helper.rb`, `spec/rails_helper.rb`)
- RSpec configured to work with Rails
- Tests can be run with `rspec` command
- RSpec matchers and expectations working correctly

---

### TB-005: Setup Cucumber for BDD Testing

#### Story
As a Developer, so that I can write behavior-driven tests from user stories, I want to setup Cucumber with Gherkin syntax support.

#### Points
5 points

#### Acceptance Criteria
- Cucumber gem added to Gemfile (test group)
- Cucumber initialized with `rails generate cucumber:install`
- Cucumber directory structure created (`features/`, `features/step_definitions/`, `features/support/`)
- `features/support/env.rb` configured for Rails integration
- Capybara integrated with Cucumber for web testing
- Cucumber can execute feature files with `cucumber` or `rake cucumber`
- Step definitions can access Rails application context

---

### TB-006: Configure Heroku Deployment

#### Story
As a Developer, so that I can deploy the application to production, I want to configure Heroku deployment settings.

#### Points
5 points

#### Acceptance Criteria
- `Procfile` created with web process configuration
- `app.json` or Heroku configuration files created
- Ruby version specified in `.ruby-version` or `Gemfile`
- Node.js buildpack configured if needed for TailwindCSS
- Environment variables documented
- Static assets compilation configured for production
- Application can be deployed to Heroku successfully
- Application runs correctly on Heroku after deployment

---

## Sprint 1: Core Functionality

### TB-101: Upload CSV File of Tournament Bracket to Local Storage

#### Story
As a Visitor, so that my tournament data is stored locally, I can upload a CSV file to save competitors to local storage.

#### Points
5 points

#### Acceptance Criteria
- Simple file import button present in the UI
- File upload input element with CSV file type restriction
- CSV file parsing implemented using Ruby CSV library
- Parsed competitor data (name column required) saved to browser local storage
- CSV upload overwrites existing tournament state in local storage
- Success message displayed after successful upload
- Error handling for invalid file formats (non-CSV files)
- Error handling for empty files
- Local storage key structure defined and consistent
- Feature test written in Cucumber covering successful CSV upload scenario
- Feature test written in Cucumber covering invalid file format error scenario
- Unit test written in RSpec for CSV parsing service/helper
- Unit test written in RSpec for local storage service/helper

---

### TB-102: Export Tournament from Local Storage to CSV File

#### Story
As a Visitor, so that I can backup my tournament data, I can export my tournament from local storage to a CSV file.

#### Points
3 points

#### Acceptance Criteria
- Simple file export button present in the UI
- Tournament data retrieved from browser local storage
- Data serialized to CSV format with competitor names
- CSV file downloadable via browser download mechanism
- File naming convention includes timestamp (e.g., `tournament_YYYYMMDD_HHMMSS.csv`)
- CSV format matches expected import format (round-trip compatible with TB-101)
- Feature test written in Cucumber covering CSV export scenario
- Feature test written in Cucumber covering export with empty tournament scenario
- Unit test written in RSpec for CSV serialization service/helper
- Unit test written in RSpec for local storage retrieval service/helper

---

### TB-103: Main UI Layout with Sidebar, Topbar, and Main Content

#### Story
As a Visitor, so that I can navigate and use the tournament bracket application effectively, I want a well-organized UI layout with sidebar, topbar, and main content area.

#### Points
5 points

#### Acceptance Criteria
- Sidebar component implemented for View changes.
- Topbar/header component implemented for Import/Export buttons
- Main content area component implemented for  the selected view associated with Sidebar
- All components should be styled with TailwindCSS v4 styling
- Feature test written in Cucumber covering layout rendering
- Feature test written in Cucumber covering responsive layout behavior

---

### TB-104: Add and Remove Competitors

#### Story
As a Visitor, so that I can make changes where I want, I can add and remove competitors to my tournament in the web application OR the CSV file.

#### Points
5 points

#### Acceptance Criteria
- "Add Competitor" button/interface element present in UI
- Form or input field to add new competitor/team with name
- New competitors are immediately visible in the bracket
- "Remove Competitor" button/action available for each competitor
- Removal updates bracket structure appropriately
- Local storage updated when competitors are added/removed
- Bracket automatically adjusts when competitors are added/removed
- Feature test written in Cucumber covering add competitor scenario
- Feature test written in Cucumber covering remove competitor scenario

---

### TB-105: Edit Competitors Names

#### Story
As a Visitor, so that I can correct information, I can edit players names in the bracket.

#### Points
3 points

#### Acceptance Criteria
- Competitor names are editable via inline editing in the UI layout
- Changes are immediately reflected in the UI display
- Changes are immediately saved to local storage
- Validation prevents saving empty names
- Edit mode clearly indicated (visual feedback during editing)
- Feature test written in Cucumber covering name edit scenario
- Feature test written in Cucumber covering validation during edit
- Unit test written in RSpec for name update service/helper
- Unit test written in RSpec for edit validation logic

---

### TB-106: Bracket Mode Toggle

#### Story
As a Visitor, so that I can switch between Bracket Modes, I can toggle Draft or Active Mode.

#### Points
3 Points

#### Acceptance Criteria
- A Toggle element is shown in the Top Bar allowing switch between Draft and Active Mode
- Feature test is written in Cucumber covering this toggle
- Unit test is written if necessary

---

### TB-107: Bracket Draft Mode

#### Story
As a Visitor, so that I can organize my tournament bracket manually, I can update the bracket directly in Draft Mode with validation.

#### Points
8 points

#### Acceptance Criteria
- Bracket visualization component implemented (Single Elimination format)
- Draft Mode toggle/selector present in UI
- In Draft Mode, competitors can be moved anywhere in the bracket via drag-and-drop
- Bracket structure updates visually when competitor is moved
- Validation prevents invalid moves (e.g., moving competitor to final match when previous matches are empty)
- Validation prevents moving competitor to match slots that would create invalid bracket structure
- Visual feedback during drag operation (highlighting, cursor changes)
- Confirm Changes button present in UI, Bracket state saved to local storage on click
- Bracket state loaded from local storage on page load
- Feature test written in Cucumber covering drag-and-drop move in Draft Mode
- Feature test written in Cucumber covering validation for invalid moves
- Feature test written in Cucumber covering bracket state persistence
- Unit test written in RSpec for bracket structure validation logic
- Unit test written in RSpec for bracket move validation service
- Unit test written in RSpec for bracket state management

---

### TB-108: Bracket Active Mode

#### Story
As a Visitor, so that I can progress through my tournament, I can update the bracket through match decisions (Win or Lose) in Active Mode, with competitors moving forward automatically.

#### Points
8 points

#### Acceptance Criteria
- Active Mode toggle/selector present in UI
- In Active Mode, bracket displays matches with competitors
- Winner selection interface (button or click) for each match
- Selected winner automatically advances to next round position
- Loser is marked as eliminated and does not advance
- Bracket updates to show winner in next round automatically
- Completed matches are visually distinct from pending matches
- Validation prevents selecting winner before match has both competitors
- Match results saved to local storage immediately
- Bracket state persists after page refresh
- Feature test written in Cucumber covering winner selection in Active Mode
- Feature test written in Cucumber covering bracket progression after winner selection
- Feature test written in Cucumber covering validation for incomplete matches
- Unit test written in RSpec for match result processing logic
- Unit test written in RSpec for bracket progression algorithm
- Unit test written in RSpec for match validation service

---

### TB-109: Double Elimination Bracket

#### Story
As a Visitor, so that I can organize tournaments with double elimination format, I can choose the Double Elimination bracket option.

#### Points
13 points

#### Acceptance Criteria
- Bracket type selector (dropdown, radio buttons, or toggle) present in UI
- Double elimination bracket type option available in selector
- Double elimination bracket visualization implemented (winners bracket and losers bracket)
- Bracket structure algorithm generates correct double elimination bracket
- Competitors start in winners bracket
- Losers from winners bracket move to losers bracket
- Winners from losers bracket continue in losers bracket
- Final match between winners bracket champion and losers bracket champion
- Bracket type selection saved to local storage
- Bracket type loaded from local storage on page load
- Draft Mode works with double elimination bracket
- Active Mode works with double elimination bracket
- Feature test written in Cucumber covering double elimination bracket creation
- Feature test written in Cucumber covering bracket type selection and persistence
- Feature test written in Cucumber covering match progression in double elimination (winners and losers brackets)
- Feature test written in Cucumber covering final match scenario
- Unit test written in RSpec for double elimination bracket generation algorithm
- Unit test written in RSpec for double elimination match progression logic
- Unit test written in RSpec for bracket type management service

---

## Sprint 2: Additional Features

### TB-201: Round Robin Bracket

#### Story


#### Points


#### Acceptance Criteria

---

### TB-202: Swiss Bracket Option

#### Story


#### Points


#### Acceptance Criteria

---

### TB-203: Free For All Bracket Option

#### Story


#### Points


#### Acceptance Criteria

---

### TB-204: Generate Bracket from Number of Participants

#### Story


#### Points


#### Acceptance Criteria

---

### TB-205: Auto-seed Any Bracket from list of competitors

#### Story


#### Points


#### Acceptance Criteria

---
