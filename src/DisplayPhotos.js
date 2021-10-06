
function DisplayPhotos({photos}) {
    return (
        <section> 
            
        { photos.length === 0 ? (
            // default display before a filter option is chosen  
            <h2> No Photos found!</h2>
        ): (
            <>
              {photos.map((photo)=>{
                  return (
                      <div className="photo-container" key={photo.id}>
                          <img src={photo.urls.small} alt={photo.alt_description} />
                      </div>
                  )
              })}
            </>
        )}      
        </section>
    );
}

export default DisplayPhotos;

