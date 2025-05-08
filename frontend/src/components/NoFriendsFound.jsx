import { useThemeStore } from "../store/useThemeStore";

const NoFriendsFound = () => {
    const { theme } = useThemeStore();
    return (
      <div className="card  p-6 text-center" data-theme={theme}>
        <h3 className="font-semibold text-lg mb-2">No friends yet</h3>
        <p className="text-base-content opacity-70">
          Connect with language partners below to start practicing together!
        </p>
      </div>
    );
  };
  
  export default NoFriendsFound;
  