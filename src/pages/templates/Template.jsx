import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Sidenav from "../../components/sidenav/Sidenav";
import NewOutput from "../../components/template/NewOutput";
import History from "../../components/template/History";
import { templates } from "../../constants/templates";

const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};

export default function Template() {
  const location = useLocation();
  const [template, setTemplate] = useState("");
  const [page, setPage] = useState("newOutput");
  const query = useQuery();
  const pageId = query.get("pageId");
  useEffect(() => {
    const currentTemp = templates.find((e) => e.link === location.pathname);
    setTemplate(currentTemp);
    setPage("newOutput");
    console.log(query.get("pageId"));
  }, [location]);

  useEffect(() => {
    if (pageId) {
      setPage(pageId);
    }
  }, []);

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <div className="d-flex">
      <Sidenav />

      {page !== "history" ? (
        <NewOutput {...template} onChangePage={handlePageChange} />
      ) : (
        <History
          typeText={template.param}
          icon={template.icon}
          desc={template.desc}
          onChangePage={handlePageChange}
        />
      )}
    </div>
  );
}
