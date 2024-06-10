import React from "react";
import { Document, Page, View } from "@react-pdf/renderer";
import { DEFAULT_FONT_COLOR, Settings } from "@/app/lib/redux/settingsSlice";
import { Resume } from "@/app/lib/redux/types";
import { styles, spacing } from "./styles";
import { ResumePDFProfile } from "./ResumePDFProfile";
import { ShowForm } from "@/app/lib/redux/settingsSlice";
import { ResumePDFWorkExperience } from "./ResumePDFWorkExperience";
import { ResumePDFEducation } from "./ResumePDFEducation";
import { ResumePDFProject } from "./ResumePDFProject";
import { ResumePDFSkills } from "./ResumePDFSkills";
import { ResumePDFCustom } from "./ResumePDFCustom";

export const ResumePDF = ({
  resume,
  settings,
  isPDF = false,
}: {
  resume: Resume;
  settings: Settings;
  isPDF?: boolean;
}) => {
  const { profile, workExperiences, educations, projects, skills, custom } =
    resume;
  const { name } = profile;

  const {
    documentSize,
    fontFamily,
    fontSize,
    themeColor,
    formToHeading,
    formsOrder,
    formToShow,
    showBulletPoints,
  } = settings;

  // Filter forms to show based on user settings
  const showFormsOrder = formsOrder.filter((form) => formToShow[form]);

  // Map form types to their respective components
  const formTypeToComponent: { [type in ShowForm]: () => JSX.Element } = {
    workExperiences: () => (
      <ResumePDFWorkExperience
        heading={formToHeading["workExperiences"]}
        workExperiences={workExperiences}
        themeColor={themeColor}
      />
    ),
    educations: () => (
      <ResumePDFEducation
        heading={formToHeading["educations"]}
        educations={educations}
        themeColor={themeColor}
        showBulletPoints={showBulletPoints["educations"]}
      />
    ),
    projects: () => (
      <ResumePDFProject
        heading={formToHeading["projects"]}
        projects={projects}
        themeColor={themeColor}
      />
    ),
    skills: () => (
      <ResumePDFSkills
        heading={formToHeading["skills"]}
        skills={skills}
        themeColor={themeColor}
        showBulletPoints={showBulletPoints["skills"]}
      />
    ),
    custom: () => (
      <ResumePDFCustom
        heading={formToHeading["custom"]}
        custom={custom}
        themeColor={themeColor}
        showBulletPoints={showBulletPoints["custom"]}
      />
    ),
  };

  return (
    <Document title={`${name} Resume`} author={name} producer={"Inhouse"}>
      <Page
        size={documentSize === "A4" ? "A4" : "LETTER"}
        style={{
          ...styles.flexCol,
          color: DEFAULT_FONT_COLOR,
          fontFamily,
          fontSize: fontSize + "pt",
        }}
      >
        {/* Render the theme color header if themeColor is set */}
        {Boolean(themeColor) && (
          <View
            style={{
              width: spacing["full"],
              height: spacing[3.5],
              backgroundColor: themeColor,
            }}
          />
        )}
        <View
          style={{
            ...styles.flexCol,
            padding: `${spacing[0]} ${spacing[20]}`,
          }}
        >
          {/* Render the profile section */}
          <ResumePDFProfile
            profile={profile}
            themeColor={themeColor}
            isPDF={isPDF}
          />
          {/* Render other sections based on the forms order */}
          {showFormsOrder.map((form) => {
            const Component = formTypeToComponent[form];
            return <Component key={form} />;
          })}
        </View>
      </Page>
    </Document>
  );
};
