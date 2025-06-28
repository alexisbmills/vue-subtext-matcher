## **Product Requirements Document: Subtext Matcher SPA**

### **1. Overview**

This document outlines the requirements for a Subtext Matcher Single Page Application (SPA). The application will be built using Vue 3, TypeScript, and the PrimeVue UI component library. The application enables users to enter strings into two inputs (Text and Subtext) and click a button that will display match results for each case-insensitive subtext match. For each match, the starting character index will be displayed. The core focus is on usability, accessibility, and performance.

### **2. Goals**

  * Provide a simple, intuitive, and highly responsive interface.
  * Ensure the application is fully accessible (WCAG 2.1 AA) and implements a responsive design for all common device sizes.
  * Support robust error handling and provide clear, non-intrusive user feedback.
  * Maintain high code quality, extensive test coverage, and a scalable architecture.
  * Adopt a "Keep It Simple" approach.
  * Display clear empty/informational states in the results area.
  * Adopt a mobile-first approach for HTML and CSS.
  * **Enable a smooth and efficient developer experience** by maintaining a clean codebase, providing clear documentation within the code, and leveraging modern tooling.

### **3. User Stories**

#### **3.1. Subtext Matcher**

  * As a user, I want a form with two inputs: a textarea called "Text" and a text input called "Subtext", with a submission button labelled "Match".
  * As a user, I want to click the "Match" button and see the results of all case-insensitive string matches of "Subtext" within "Text".
  * As a user, I want the results displayed as a list of styled numbers, where each number is the starting character index of a match.
  * As a user, if no matches are found, I want to see a clear message stating "No matches found."
  * As a user, I want to be prevented from clicking the "Match" button unless both the "Text" and "Subtext" fields are filled out.
  * As a user, I want to see an initial empty state in the results area before I perform a search.
  * As a user, I want a "Reset" button that clears both input fields, removes any validation errors, and returns the results area to its initial empty state.

#### **3.2. Subtext Matcher Help**

  * As a user, I want to click a "Help" icon button in the top navbar to toggle a drawer open or closed, but only when I am on the Subtext Matcher page.
  * As a user, I want the help drawer to close if I press the `Escape` key or click on the overlay outside the drawer.
  * As a user, I want the drawer to contain a simple guide on how to use the form, including a brief example and a note about the case-insensitive matching.

#### **3.3. About**

  * As a user, I want to navigate to an "About" page that displays introductory text and external links to portfolio examples.

-----

### **4. Functional Requirements**

#### **4.1. Subtext Matcher & Results**

  * **Responsive Layout:** The interface will use a responsive layout.

      * On small screens (e.g., `<768px`), the Form and Matching Results areas will be stacked vertically in a single column.
      * On larger screens (e.g., `≥768px`), the layout will switch to two columns, with the Form on the left and the Matching Results on the right. This will be implemented using a flexbox-based grid system like PrimeVue's `FlexGrid`.

  * **Form Validation:**

      * The "Text" and "Subtext" fields are required.
      * Validation must provide clear, inline error messages adjacent to the invalid field. PrimeVue's `p-message` component is recommended for this.
      * **Technical Recommendation:** Use a dedicated validation library such as **VeeValidate** or **Vuelidate** to manage form state and validation logic.

  * **Matching Logic Performance:**

      * To ensure the UI remains responsive and never freezes, the string matching algorithm **must be executed in a Web Worker**. This offloads the computation from the browser's main thread.

  * **Results Display States:**

      * **Initial State:** Before any search is performed, the results area will display a message like "Results will appear here."
      * **No Results State:** If a search yields zero matches, the results area will display the message: "No matches found."
      * **Results Found State:** When matches are found, the area will display the heading "Matches Found" followed by the list of starting indices.

  * **Custom Match Directive (`v-highlight`):**

      * Each resulting match index number will be rendered in its own element (e.g., a `<span>`).
      * This element will have a custom Vue directive, `v-highlight`, applied to it.
      * The directive will apply a CSS class that provides distinct styling (e.g., a background color, padding, border, and border-radius).
      * **Animation:** The directive will also trigger a brief "pulse" animation the first time the element is rendered to the DOM. This can be achieved with CSS keyframes.

    **CSS Implementation Example:**

    ```css
    @keyframes pulse-animation {
      0% { transform: scale(0.95); opacity: 0.7; }
      70% { transform: scale(1.05); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }

    .match-highlight {
      display: inline-block;
      margin: 0.25rem;
      padding: 0.25rem 0.5rem;
      background-color: var(--yellow-100);
      border: 1px solid var(--yellow-400);
      border-radius: 6px;
      animation: pulse-animation 0.5s ease-out;
    }
    ```

#### **4.2. Navigation**

  * Users can navigate between the "Subtext Matcher" and "About" pages via `vue-router` links in the main navigation bar. Page transitions should not trigger a full browser reload.

#### **4.3. Conditional UI (Help Button)**

  * The "Help" button in the main navigation **must only be visible** when the user is on the "Subtext Matcher" route.
  * **Implementation:** This will be achieved using route metadata in `vue-router`. The Subtext Matcher route will have a `meta: { showHelpButton: true }` property, which the navigation component will use to conditionally render the button with `v-if`.

-----

### **5. Non-Functional Requirements**

  * **Performance:** The application must be performant. Utilize code splitting by route (lazy loading) in Vue Router. The core string matching logic must run in a Web Worker to prevent UI blocking.
  * **Responsiveness:** The UI must adapt seamlessly to different screen sizes, from mobile phones to desktop monitors, using a mobile-first CSS approach.
  * **Maintainability:** The project must follow a modular, feature-based file structure to ensure a clear separation of concerns.
  * **Test Coverage:** The codebase must achieve a minimum of 80% unit and integration test coverage.

### **6. Frontend Architecture**

  * **Project Structure:** The `src` directory will be organized logically:
      * `/assets`: Global CSS, fonts, and images.
      * `/components`: Reusable UI components (e.g., `AppHeader.vue`).
      * `/composables`: Reusable Composition API functions (e.g., `useSubtextMatcher.ts`).
      * `/directives`: Custom Vue directives (e.g., `highlight.ts`).
      * `/router`: Vue Router configuration.
      * `/types`: TypeScript interfaces and type definitions.
      * `/utils`: Pure, framework-agnostic helper functions.
      * `/views`: Top-level route components (e.g., `SubtextMatcherView.vue`).

### **7. Vue Standards**

  * The Composition API will be used for all new components.
  * The `<script setup>` syntax is mandatory.
  * All reusable component logic must be extracted into composable functions (e.g., `use...`).

### **8. Accessibility**

  * Use semantic HTML and ARIA attributes where necessary.
  * Ensure all interactive elements are fully navigable and operable via keyboard.
  * Provide sufficient color contrast and clear `outline` focus indicators.
  * **Forms:** All form inputs must have associated `<label>`s. Validation error messages must be linked to inputs via `aria-describedby`.
  * **Live Regions:** The results area must have `aria-live="polite"` so that screen readers announce when results appear or are updated.
  * **Drawers/Modals:** Any modal dialog or drawer (like the Help drawer) must trap keyboard focus within it when open.

### **9. Security**

  * Prevent Cross-Site Scripting (XSS) by never using the `v-html` directive with user-provided content.
  * All external links (e.g., in the "About" page) must include `rel="noopener noreferrer"` to prevent tabnabbing.

### **10. Testing**

  * **Unit & Integration Testing:** All utilities, composables, and components will be tested.
  * **Test Runner:** **Vitest** will be used for running tests.
  * **Component Test Library:** **Vue Test Utils** will be used for mounting and testing Vue components.
  * **Recommendation:** Supplement with **`@testing-library/vue`** to write tests that assert component behavior from a user's perspective.

### **11. Tooling & Core Libraries**

  * **Framework:** Vue 3
  * **Build Tool:** Vite
  * **Language:** TypeScript
  * **UI Library:** PrimeVue
  * **Routing:** Vue Router
  * **Testing:** Vitest, Vue Test Utils

### **12. Out of Scope**

  * Task sharing or collaboration features.
  * Server-side rendering (SSR).
  * End-to-end (E2E) testing.
  * Real-time updates (e.g., via WebSockets).
  * User accounts or data persistence.