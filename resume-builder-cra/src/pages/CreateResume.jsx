import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { TemplatesData } from "../utils/helpers";
import { MainSpinner } from "../components";
import useTemplates from "../hooks/useTemplates";
import Template1 from "../designs/Template1"; // Import your template components
import Template2 from "../designs/Template2"; // Import your template components

// Function to get the component based on its name
const getTemplateComponent = (templateName) => {
  switch (templateName) {
    case "Template1":
      return <Template1 />;
    case "Template2":
      return <Template2 />;
    default:
      return null;
  }
};

const CreateResume = () => {
  const navigate = useNavigate();
  const {
    data: templates,
    isLoading: temp_isLoading,
    isError: temp_isError,
    fetchTemplates,
  } = useTemplates();

  useEffect(() => {
    fetchTemplates(); // Assuming fetchTemplates is a function to fetch templates
  }, [fetchTemplates]);

  if (temp_isLoading) {
    return <MainSpinner />;
  }

  if (temp_isError) {
    return <div>Error fetching templates. Please try again later.</div>;
  }

  if (!templates || templates.length === 0) {
    return <div>No templates available.</div>;
  }

  return (
    <div className="w-full flex flex-col items-center justify-start py-4">
      <Routes>
        {TemplatesData.map((template) => (
          <Route
            key={template.id}
            path={`/${template.name}`}
            element={getTemplateComponent(template.name)}
          />
        ))}
      </Routes>
    </div>
  );
};

export default CreateResume;
