import CollectionMenu from "../../components/collection/CollectionMenu";


const Collection = () => {
  return (
    <>
      {/* Collection 배너이미지 Sec */}

      <section className="mb-[200px]">
        <img src="" alt="" className="bg-gray-400 w-full h-[841px]" />
      </section>

      {/* Collection 소개 Sec */}
      <div className='px-[80px]'>
        <section className="mt-[80px] mb-[200px] w-[1168px] mx-auto">
          {/* 소개 Title */}
          <div className="font-diptyque text-heading1 text-center">Philosykos</div>
          <div className="mt-[40px]">
            Body Medium. Most fonts have a particular weight which corresponds to one of the numbers in Common weight
            name mapping. However some fonts, called variable fonts, can support a range of weights with a more or less
            fine granularity, and this can give the designer a much closer degree of control over the chosen weight.
          </div>
        </section>

        {/* Collection 상품 Sec */}
        <section className="my-[200px]">
          <CollectionMenu/>
        </section>
      </div>
    </>
  );
};

export default Collection;
