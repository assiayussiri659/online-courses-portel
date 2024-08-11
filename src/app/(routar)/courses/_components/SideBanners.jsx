import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState } from 'react';

function SideBanners() {
  const [sideBannerList, setSideBannerList] = useState([]);

  useEffect(() => {
    getSideBanners();
  }, []);

  const getSideBanners = async () => {
    try {
      const response = await GlobalApi.getGitSideBanner();
      console.log("response::",response);
      setSideBannerList(response.data.sideBanners);
    } catch (error) {
      console.error('Error fetching side banners:', error);
    }
  };

  return (
    
    <div>
      {sideBannerList && sideBannerList.map((item, index) => (
        <div key={index}>
          <img
            src={item?.banner?.url}
            alt='banner'
            width={500}
            height={300}
            onClick={()=>window.open(item?.url)}
            className='rounded-xl cursor-pointer gap-4 mt-4'
          />
          
        </div>
      ))}
    </div>
  );
}

export default SideBanners;


