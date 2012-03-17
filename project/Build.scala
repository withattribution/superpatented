import sbt._
import Keys._
import PlayProject._

object ApplicationBuild extends Build {

    val appName         = "superpatented"
    val appVersion      = "1.0-SNAPSHOT"

    val appDependencies = Seq(
	  "postgresql" % "postgresql" % "8.4-702.jdbc4"    	
      // Add your project dependencies here,
    )

    val main = PlayProject(appName, appVersion, appDependencies, mainLang = SCALA).settings(
      // Add your own project settings here      
    )

}
