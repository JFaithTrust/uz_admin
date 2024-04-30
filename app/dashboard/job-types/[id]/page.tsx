// pages/items/[id].tsx (View Page)

const ViewId = ({ params }: { params: { id: string } }) => {
  // Fetch item data based on `id`

  return (
    <div>
      <h1>Viewing Item {params.id}</h1>
      {/* Display item details */}
    </div>
  );
};

export default ViewId;
