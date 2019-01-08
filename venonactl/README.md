# venonactl

Manages Codefresh runtime environment

```
Usage: venonactl <command> [options]

Commands:
        install --api-key <codefresh api-key> --cluster-name <cluster-name> [--url <codefresh url>] [kube params]

        status [kube params]

        delete [kube params]

Options:
   [kube params]
        kubeconfig
        kubecontext
        namespace
```

### Download Binary
http://download.codefresh.io.s3-website-us-east-1.amazonaws.com/venonactl/<version>/<system>/<platform>/venonactl

Linux: http://download.codefresh.io.s3-website-us-east-1.amazonaws.com/venonactl/latest/Linux/x86_64/venonactl
Mac: http://download.codefresh.io.s3-website-us-east-1.amazonaws.com/venonactl/latest/Darwin/x86_64/venonactl

### Build
Set Go environment + dep and `build.sh`
`venonactl` will be in $GOPATH/bin

### Push for public downloading
./push-s3.sh <version> [path/to/venonactl]

### `venonactl install` Flow
- call Codefresh api to validate api-key and get some data
- generate Csr, submit it for signing to Codefresh 
- Create Config object
- Parse and execute all the templates in ./templates/<runtime-type>/ into map of k8s.io/apimachinery/pkg/runtime.Object 
- Post all the objects to kubernetes

### Templates
venonactl applies kubernetes objects generated from templates in ./templates/<runtime-type>/
These are go-templates with gomplate functions - see https://gomplate.hairyhenderson.ca/ 

The template values are provided from Config struct (from runtimectl/types.go)

###### Adding new templates
Just add valid template files of kubernetes yamls into ./templates/<runtime-type>/
and `build.sh`
we are using `go generate ` to create templates.go 


