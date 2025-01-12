<div className="main" id="container">
  {shouldDisplayLayout && (
    <Toppbar collegeId={storedCollegeId} toggleSidebar={toggleSidebar} />
  )}
  <div className="relative flex h-screen">
    {shouldDisplayLayout && <Sidebar isOpen={isSidebarOpen} />}
    <div
      id="myPanel"
      className="mainPanel"
      style={{
        marginTop: shouldDisplayLayout ? "88px" : "0",
        marginLeft: shouldDisplayLayout
          ? isSidebarOpen
            ? "18rem"
            : "60px"
          : "0",
        transition: "margin-left 0.1s ease",
      }}
    >
      <div className="flex-1">{children}</div>
      {shouldDisplayLayout && <Bottombar />}
    </div>
  </div>
</div>;
