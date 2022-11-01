class WebModel{
  constructor(url){
    this.loadModel(url);
  }

  async loadModel(url){
    this.model = await tf.loadLayersModel(url);
  }

  async evaluate(data){
    const x_test = tf.tensor2d([data])

    const prediction = await this.model.predict(x_test)
    const newImg = await prediction.array();

    // return both original image and new one
    return [data, newImg.flat()];
  }
}
