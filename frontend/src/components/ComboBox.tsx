import React, { useState, useEffect, useRef, useCallback, useId } from "react";

// 1. Type Definitions
// ====================

/**
 * Defines the shape of a single suggestion item.
 * It must have a unique 'id' and a 'name' to display.
 */
interface SuggestionItem {
    id: string; // Unique identifier for the item
    name: string; // The text to display for the suggestion
    // Add any other properties your suggestion objects might have
    // e.g., value?: string; category?: string;
}

/**
 * Defines the props accepted by the ComboBox component.
 */
interface ComboBoxProps {
    data: SuggestionItem[]; // The full list of items to search from
    onSelect: (item: SuggestionItem) => void; // Callback when an item is selected
    placeholder?: string; // Optional placeholder text for the input
    className?: string; // Optional additional Tailwind classes for the outer div
}

// 2. ComboBox Functional Component
// =================================

const ComboBox: React.FC<ComboBoxProps> = ({
    data,
    onSelect,
    placeholder = "Search...",
    className = "",
}) => {
    // 3. State Management
    // ===================
    const [inputValue, setInputValue] = useState<string>(""); // Current text in the input field
    const [filteredSuggestions, setFilteredSuggestions] = useState<
        SuggestionItem[]
    >([]); // Suggestions matching input
    const [showDropdown, setShowDropdown] = useState<boolean>(false); // Controls dropdown visibility
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1); // Index of the currently highlighted suggestion for keyboard nav

    // 4. Refs for DOM Interaction
    // ===========================
    const wrapperRef = useRef<HTMLDivElement>(null); // Ref for the main component wrapper (for click outside)
    const inputRef = useRef<HTMLInputElement>(null); // Ref for the input element
    const listRef = useRef<HTMLUListElement>(null); // Ref for the suggestion list

    // For unique IDs for accessibility attributes (React 18+)
    const inputId = useId();
    const listId = useId();

    // 5. Filtering Logic (useEffect)
    // ==============================

    /**
     * Effect to filter suggestions whenever 'inputValue' or 'data' changes.
     * Also manages dropdown visibility based on filter results.
     */
    useEffect(() => {
        if (inputValue.length > 0) {
            // Filter the data based on whether the item name includes the input value (case-insensitive)
            const filtered = data.filter((item) =>
                item.name.toLowerCase().includes(inputValue.toLowerCase())
            );
            setFilteredSuggestions(filtered);

            // Show dropdown only if there are matching suggestions
            if (filtered.length > 0) {
                setShowDropdown(true);
            } else {
                setShowDropdown(false); // Hide if no matches
            }
        } else {
            // If input is empty, clear suggestions and hide dropdown
            setFilteredSuggestions([]);
            setShowDropdown(false);
        }
        setHighlightedIndex(-1); // Reset highlight whenever filtering occurs
    }, [inputValue, data]); // Dependencies: re-run when inputValue or data changes

    // 6. Click Outside Handler (useEffect)
    // ====================================

    /**
     * Effect to close the dropdown when a click occurs outside the ComboBox component.
     */
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // If the click is outside the wrapperRef element, close the dropdown
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setShowDropdown(false);
            }
        };

        // Add event listener when component mounts
        document.addEventListener("mousedown", handleClickOutside);

        // Clean up event listener when component unmounts
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []); // Empty dependency array: runs once on mount and cleans up on unmount

    // 7. Event Handlers
    // =================

    /**
     * Handles changes in the input field.
     * @param e - The React change event.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    /**
     * Handles selection of a suggestion, either by click or Enter key.
     * Uses useCallback for memoization, preventing unnecessary re-creation.
     * @param suggestion - The selected SuggestionItem.
     */
    const handleSelectSuggestion = useCallback(
        (suggestion: SuggestionItem) => {
            setInputValue(suggestion.name); // Set input value to selected suggestion's name
            setShowDropdown(false); // Close dropdown
            setHighlightedIndex(-1); // Reset highlight
            onSelect(suggestion); // Call the parent's onSelect callback
            inputRef.current?.focus(); // Return focus to input for better UX
        },
        [onSelect]
    ); // Dependency: re-create if onSelect prop changes

    /**
     * Handles keyboard navigation (ArrowUp, ArrowDown, Enter, Escape).
     * @param e - The React keyboard event.
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            e.preventDefault(); // Prevent page scroll
            setHighlightedIndex(
                (prevIndex) => (prevIndex + 1) % filteredSuggestions.length // Cycle through suggestions
            );
            // Optional: scroll highlighted item into view
            if (listRef.current && highlightedIndex !== -1) {
                const item = listRef.current.children[highlightedIndex + 1]; // +1 because we update index first
                if (item)
                    item.scrollIntoView({
                        block: "nearest",
                        inline: "nearest",
                    });
            }
        } else if (e.key === "ArrowUp") {
            e.preventDefault(); // Prevent page scroll
            setHighlightedIndex(
                (prevIndex) =>
                    (prevIndex - 1 + filteredSuggestions.length) %
                    filteredSuggestions.length // Cycle backwards
            );
            // Optional: scroll highlighted item into view
            if (listRef.current && highlightedIndex !== -1) {
                const item = listRef.current.children[highlightedIndex - 1];
                if (item)
                    item.scrollIntoView({
                        block: "nearest",
                        inline: "nearest",
                    });
            }
        } else if (e.key === "Enter") {
            // If a suggestion is highlighted, select it
            if (
                highlightedIndex !== -1 &&
                filteredSuggestions[highlightedIndex]
            ) {
                handleSelectSuggestion(filteredSuggestions[highlightedIndex]);
            } else {
                // If no suggestion is highlighted but input has value, treat it as a custom entry
                // or just close the dropdown without selecting anything.
                // For this example, we'll just close it.
                setShowDropdown(false);
            }
        } else if (e.key === "Escape") {
            setShowDropdown(false);
            setHighlightedIndex(-1);
            inputRef.current?.blur(); // Remove focus from input
        }
    };

    // 8. JSX Structure and Tailwind Styling
    // =====================================

    return (
        <div className={`relative ${className}`} ref={wrapperRef}>
            {/* Input Field */}
            <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowDropdown(true)} // Show dropdown when input is focused
                placeholder={placeholder}
                // Tailwind classes for styling the input
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                // Accessibility (ARIA) Attributes
                role="combobox" // Indicates this is a combobox
                aria-autocomplete="list" // Specifies that a list of suggestions is provided
                aria-controls={listId} // Associates the input with the suggestions list
                aria-expanded={showDropdown ? "true" : "false"} // Indicates if the dropdown is open
                aria-haspopup="listbox" // Indicates a listbox popup will be shown
                aria-labelledby={inputId} // Associates with a label, though here it's implicitly part of the role. For a real label, you'd use a separate <label> and link it via 'htmlFor' and 'id'.
                aria-activedescendant={
                    highlightedIndex !== -1
                        ? `suggestion-item-${useId()}-${highlightedIndex}`
                        : undefined
                } // Points to the currently highlighted item for screen readers
                id={inputId} // Unique ID for the input
            />

            {/* Suggestions Dropdown */}
            {showDropdown && filteredSuggestions.length > 0 && (
                <ul
                    id={listId} // Unique ID for the list, referenced by aria-controls on the input
                    ref={listRef}
                    // Tailwind classes for styling the dropdown list
                    className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto"
                    role="listbox" // Indicates this is a listbox of options
                >
                    {filteredSuggestions.map((suggestion, index) => (
                        <li
                            key={suggestion.id} // Unique key for React list rendering
                            id={`suggestion-item-${useId()}-${index}`} // Unique ID for each list item, referenced by aria-activedescendant
                            // Tailwind classes for styling individual list items
                            className={`p-2 cursor-pointer ${
                                index === highlightedIndex
                                    ? "bg-blue-100 text-blue-800"
                                    : "hover:bg-gray-100"
                            }`}
                            onClick={() => handleSelectSuggestion(suggestion)}
                            role="option" // Indicates this is an option within a listbox
                            aria-selected={
                                index === highlightedIndex ? "true" : "false"
                            } // Indicates if this option is currently selected/highlighted
                        >
                            {suggestion.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ComboBox;
