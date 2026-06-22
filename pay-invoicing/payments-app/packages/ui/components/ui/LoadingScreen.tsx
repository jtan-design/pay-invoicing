
interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen = ({
  message = "Loading..."
}: LoadingScreenProps) => {
  return (
    <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center">
      <div className="text-center">
        <img
          className="w-[163.68px] h-8 mx-auto mb-4"
          alt="Logo"
          src="/logo.svg"
        />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}; 