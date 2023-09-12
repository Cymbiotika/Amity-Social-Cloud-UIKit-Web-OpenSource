import customizableComponent from '~/core/hocs/customization';
import { useNavigation } from '~/social/providers/NavigationProvider';

const SocialSearchv2 = ({ className, defaultValue }) => {
  const { onChangePage, onClickSearchFeed } = useNavigation();

  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const inputValue = event.target.elements.searchInput.value; // Get the input value
    onClickSearchFeed(inputValue); // Call your function with the input value
  };

  return (
    <form
      className={`flex flex-row border border-[#EBECEF] rounded-md justify-between ${className}`}
      onSubmit={handleSearchSubmit}
    >
      <input
        id="searchInput"
        name="searchInput"
        type="text"
        placeholder="Search"
        className="h-11 px-3 rounded-l-md w-full"
        defaultValue={defaultValue}
      />
      <button
        className="rounded-r-md bg-[#005850] w-11 flex flex-shrink-0 justify-center items-center"
        type="submit"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.875 16.6562L14.0938 12.875C14 12.8125 13.9062 12.75 13.8125 12.75H13.4062C14.375 11.625 15 10.125 15 8.5C15 4.9375 12.0625 2 8.5 2C4.90625 2 2 4.9375 2 8.5C2 12.0938 4.90625 15 8.5 15C10.125 15 11.5938 14.4062 12.75 13.4375V13.8438C12.75 13.9375 12.7812 14.0312 12.8438 14.125L16.625 17.9062C16.7812 18.0625 17.0312 18.0625 17.1562 17.9062L17.875 17.1875C18.0312 17.0625 18.0312 16.8125 17.875 16.6562ZM8.5 13.5C5.71875 13.5 3.5 11.2812 3.5 8.5C3.5 5.75 5.71875 3.5 8.5 3.5C11.25 3.5 13.5 5.75 13.5 8.5C13.5 11.2812 11.25 13.5 8.5 13.5Z"
            fill="white"
          />
        </svg>
      </button>
    </form>
  );
};

export default customizableComponent('SocialSearchv2', SocialSearchv2);
