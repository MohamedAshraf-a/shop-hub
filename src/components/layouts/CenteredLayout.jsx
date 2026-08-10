const CenteredLayout = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-8 ${className}`}
      {...props}
    >
      <div className="w-full max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
};

export default CenteredLayout;