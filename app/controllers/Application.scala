package controllers

import play.api._
import play.api.mvc._

object Application extends Controller {
  
  def index = Action {
  	Redirect(routes.Application.srysly)
  }

  def srysly = Action {
  	Ok("FUCK EVERYONE")
  }
  
}