import CreateCourseForm from "../../../../components/courses/CreateCourseForm";
import { db } from "../../../../lib/db";

const CreateCoursePage = async () => {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        subCategories: true,
      },
    });

    // Check if categories is undefined or empty
    if (!categories || categories.length === 0) {
      console.error("No categories found or categories array is empty.");
      return <div>No categories found or categories array is empty.</div>;
    }

    return (
      <div>
        <CreateCourseForm
          categories={categories.map((category) => ({
            label: category.name,
            value: category.id,
            subCategories: category.subCategories.map((subcategory) => ({
              label: subcategory.name,
              value: subcategory.id,
            })),
          }))}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Handle error state or show an error message
    return <div>Error fetching categories. Please try again later.</div>;
  }
};

export default CreateCoursePage;
