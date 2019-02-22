<template>
<div class="subject-new">
    <Breadcrumb
        class="breadcrumb"
        >
        <BreadcrumbItem to="/subjects">知识库</BreadcrumbItem>
        <BreadcrumbItem>新建主题</BreadcrumbItem>
    </Breadcrumb>
    <Divider></Divider>
    <Form 
        :model="newSubject" 
        label-position="top"
        class="form"
        >
        <FormItem label="主题名">
            <Input v-model="newSubject.name" />
        </FormItem>
        <FormItem label="主题描述">
            <Input 
                v-model="newSubject.description" 
                :rows="5"
                type="textarea"
                />
        </FormItem>
        <FormItem>
            <Button type="primary" @click="submitHandler">创建</Button>
        </FormItem>
    </Form>
</div>
</template>

<script>
import gql from 'graphql-tag'
import { mutate, getVueApolloErrorMessage } from '../../utils/helper.js'
export default {
    data() {
        return {
            newSubject: {
                name: '',
                description: '',
            }
        }
    },
    methods: {
        async submitHandler() {
            const { name, description } = this.newSubject
            const [err, res] = await mutate(this, {
                mutation: gql`
                    mutation createSubject {
                        subjectName: createSubject(name: "${name}", description: "${description}")
                    }
                `
            })
            if (err) {
                const errorMessage = getVueApolloErrorMessage(err)
                this.$Message.error(errorMessage);
                return;
            }
            this.$Message.success('创建成功')
        }
    }
}
</script>

<style lang="less" scoped>
.form {
    width: 480px;
    margin-top: 48px;
}
</style>


