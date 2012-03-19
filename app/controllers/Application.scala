package controllers

import play.api._
import play.api.mvc._

object Application extends Controller {
  
  def index = Action {
  	  Ok(views.html.index("FUCK EVERYONE"))
  	  //Redirect(routes.Application.srysly)
  }

  def srysly = Action {
  	Ok("FUCK EVERYONE BUT ME")
  }
  
}