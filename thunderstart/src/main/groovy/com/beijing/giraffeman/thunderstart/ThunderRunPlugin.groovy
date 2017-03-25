package com.beijing.giraffeman.thunderstart

import org.gradle.api.Plugin
import org.gradle.api.Project




public class ThunderRunPlugin implements Plugin<Project>{

    @Override
    void apply(Project project) {
        project.tasks.create(name:'testPlugin')<<{
            println('we test the plugins')

        }

    }
}