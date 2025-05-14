type TProductPageHeaderProps = {
  action: {
    toggle: () => void;
  };
};

const ProductPageHeader: React.FC<TProductPageHeaderProps> = ({  }) => {

  return (
    <header className="pt-10">
      <div className="d-flex align-items-center text-gray-500 my-4">
        <h1 className="contactapp-title link-dark mb-0">Tambahkan menu makanan yang ada di resto</h1>
      </div>
    </header>
  );
};

export default ProductPageHeader;
