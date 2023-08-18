import { createContext, useState } from "react";
import { getTemplates } from "../API/template";
import { templates } from "../constants/templates";
import { useEffect } from "react";
const defaultValue = {
  allTemplates: null,
};
export const TemplateContext = createContext(defaultValue);

const TemplateContextProvider = (props) => {
  const [allTemplates, setAllTemplates] = useState("");
  const updateTemplates = async () => {
    let arr = [];
    const results = templates.map(async (temp, index) => {
      const { totals } = await getTemplates(temp);
      temp.totals = totals;
      arr[index] = temp;
    });
    Promise.all(results).then(() => {
      setAllTemplates(arr);
    });
  };

  useEffect(() => {
    console.log("allTemp:", allTemplates);
  }, [allTemplates]);

  return (
    <TemplateContext.Provider
      value={{
        allTemplates,
        updateTemplates,
      }}
    >
      {props.children}
    </TemplateContext.Provider>
  );
};

export default TemplateContextProvider;
